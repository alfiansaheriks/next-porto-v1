import { Projects, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Projects[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/projects`)
  const data = await response.json()
  console.log(data)
  return data
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto z-50">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
