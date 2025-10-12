import BuyCourse from '@/components/buy-course'
import PanelTopbar from '@/components/panel-topbar'
const Page = () => {
  return (
    <div className="rounded-lg overflow-hidden">
      <PanelTopbar suite="WahTabla" service="Buy Courses" />
      <BuyCourse />
    </div>
  )
}

export default Page