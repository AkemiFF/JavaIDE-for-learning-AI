import { IDE } from '@/components/ide'
import { MatrixRain } from '@/components/matrix-rain'

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />
      <div className="relative z-10 p-4 h-screen flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-4 text-green-500 text-shadow">Java IDE for learning</h1>
        <div className="flex-grow overflow-hidden">
          <IDE />
        </div>
      </div>
    </main>
  )
}

