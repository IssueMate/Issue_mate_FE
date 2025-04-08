import LoginModal from "@/components/login/login-modal";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">IssueMate</h1>
        <p className="text-xl text-muted-foreground">
          이슈 관리를 더 쉽고 효율적으로
        </p>
      </div>
      <LoginModal />
    </main>
  );
}
