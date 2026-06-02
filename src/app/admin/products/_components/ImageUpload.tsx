"use client";

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { createClient } from "@/lib/supabase/client";
import { ImageSquare, X, ArrowsClockwise } from "@phosphor-icons/react";

// ── Canvas helpers ────────────────────────────────────────────

async function getCroppedWebP(
  imageSrc: string,
  cropArea: Area,
  targetWidth = 600,
  quality = 0.82
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = targetWidth;
  canvas.height = Math.round((cropArea.height / cropArea.width) * targetWidth);

  ctx.drawImage(
    image,
    cropArea.x * scaleX,
    cropArea.y * scaleY,
    cropArea.width * scaleX,
    cropArea.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/webp", quality)
  );
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", reject);
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });
}

// ── Component ─────────────────────────────────────────────────

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  productName?: string;
}

type Step = "idle" | "cropping" | "uploading";

export function ImageUpload({ value, onChange, productName }: ImageUploadProps) {
  const [step, setStep] = useState<Step>("idle");
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Arquivo deve ser uma imagem.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result as string);
      setStep("cropping");
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    };
    reader.readAsDataURL(file);
  }

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedArea(areaPixels);
  }, []);

  async function handleConfirm() {
    if (!src || !croppedArea) return;
    setStep("uploading");
    setError(null);
    try {
      const blob = await getCroppedWebP(src, croppedArea);
      const fileName = `${Date.now()}-${(productName ?? "product").toLowerCase().replace(/\s+/g, "-")}.webp`;
      const supabase = createClient() as any;
      const { data, error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, blob, { contentType: "image/webp", upsert: false });

      if (uploadError) throw new Error(uploadError.message);

      const { data: { publicUrl } } = supabase.storage.from("products").getPublicUrl(data.path);
      onChange(publicUrl);
      setSrc(null);
      setStep("idle");
    } catch (err: any) {
      setError(err.message ?? "Erro no upload.");
      setStep("cropping");
    }
  }

  function handleCancel() {
    setSrc(null);
    setStep("idle");
    setError(null);
  }

  // ── Cropping modal ────────────────────────────────────────

  if (step === "cropping" && src) {
    return (
      <div className="flex flex-col gap-3">
        <div className="relative h-72 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: { borderRadius: "12px" },
              cropAreaStyle: { border: "2px solid rgba(57,255,20,0.7)" },
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 w-10">
            Zoom
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 accent-[#39ff14]"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-[11px] text-red-400">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-2 rounded-full border border-[#39ff14]/30 bg-[#39ff14]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#39ff14] transition-all hover:bg-[#39ff14]/20"
          >
            Confirmar recorte
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 transition-all hover:text-zinc-100"
          >
            <X size={12} weight="bold" />
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  // ── Uploading state ───────────────────────────────────────

  if (step === "uploading") {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
        <div className="flex flex-col items-center gap-2">
          <ArrowsClockwise size={20} className="animate-spin text-[#39ff14]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Processando e enviando…
          </span>
        </div>
      </div>
    );
  }

  // ── Idle — preview or dropzone ────────────────────────────

  return (
    <div className="flex flex-col gap-3">
      {value && (
        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/60 text-zinc-300 hover:text-white"
          >
            <X size={12} weight="bold" />
          </button>
        </div>
      )}

      <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-8 transition-colors hover:border-[#39ff14]/30 hover:bg-[#39ff14]/[0.03]">
        <ImageSquare size={28} className="text-zinc-600" />
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="font-mono text-[11px] text-zinc-400">
            {value ? "Trocar imagem" : "Clique para escolher"}
          </span>
          <span className="font-mono text-[10px] text-zinc-600">
            JPG, PNG, WEBP — será convertido para WebP 600px
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </label>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-[11px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
