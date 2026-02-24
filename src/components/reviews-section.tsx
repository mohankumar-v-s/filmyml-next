import Image from "next/image"

export default function ReviewsSection() {
    return (
        <section className="my-12">
            <h2 className="mb-4 text-xl font-bold uppercase">Reviews (1)</h2>

            <div className="rounded-lg bg-gray-900 p-4">
                <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-700">
                        <img src="/placeholder.svg?height=40&width=40" alt="User avatar" className="object-cover" />
                    </div>
                    <div>
                        <h3 className="font-medium">@kimwolfdanza</h3>
                        <p className="text-xs text-gray-400">10.03.2025 01:49:14</p>
                    </div>
                </div>
                <p className="text-gray-300">&quot;Epic Captain America action!&quot;</p>
            </div>
        </section>
    )
}
