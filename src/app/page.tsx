import FileInputForm from "@/components/form";
import ButtonSobre from "@/components/ui/ButtonSobre";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white py-12">
      <ButtonSobre/>
      <div className="container mx-auto px-4">
         <FileInputForm />       
      </div>
    </main>
  );
}
