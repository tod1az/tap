import DashboardHeader from "@/components/dashboard-header"
import Header from "@/components/header"



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  )
}
