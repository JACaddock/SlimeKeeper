import { useState } from "react";


const SplicingMenu = () => {
    const [open, setOpen] = useState(false);


    return (
        <div>
            {open
            ?
                <div className="splice-menu">
                    <p>This is actually a menu that is now open</p>
                </div>
            :
            <button onClick={() => setOpen(true)}>Splice Slimes</button>
            }
        </div>
    );
}

export default SplicingMenu;