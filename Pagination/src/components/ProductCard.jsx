export default function ProductCard({ title, thumbnail: image }) {
    return (
        <div className="card">
            <h1>{title}</h1>
            <img src={image} alt={`${title}'s image`} className="productImage" />
        </div>
    )
}