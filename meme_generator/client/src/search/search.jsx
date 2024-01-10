import "./style_search.css"
import Filter from "./filter"
import Sort from "./sort"

export default function Search() {
    return(
        <div id="Search">
            <Filter />
            <Sort />
            <hr></hr>
        </div>
    )
}