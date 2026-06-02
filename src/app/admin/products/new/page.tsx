import { AdminShell } from "../../_components/AdminShell";
import { PageHeader } from "../../_components/AdminField";
import { ProductForm } from "../_components/ProductForm";

export default function NewProductPage() {
  return (
    <AdminShell>
      <PageHeader title="Novo Produto" />
      <ProductForm />
    </AdminShell>
  );
}
