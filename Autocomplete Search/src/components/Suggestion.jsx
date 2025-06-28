export function Suggestion({ searchSuggestion }) {
    return (
        <div className="suggestion-container">
            {searchSuggestion.map(recipe => <span className="suggestion" key={recipe.id}>{recipe.name}</span>)}
        </div>
    )
}