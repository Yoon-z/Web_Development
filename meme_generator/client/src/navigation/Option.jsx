import "./style_nav.css";
import { Link } from "react-router-dom";

export default function Option() {
    return (
        <div className="Options">
          <Link className="select" to='/'>Home</Link>
          <Link className="select" to='/create'>Create</Link>
        </div>
        
      );
}