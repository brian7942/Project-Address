import dynamic from "next/dynamic"

const GenerateAddressPage = dynamic(() => import('@/components/map/GenerateAddressPage'), {
  ssr: false,
})

export default function Page() {
  return <GenerateAddressPage />
}