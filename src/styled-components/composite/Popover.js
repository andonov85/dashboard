import { useState } from 'react';
import { Popover } from 'react-tiny-popover';

const CustomPopover = ({ children, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopover = () => {
        setIsOpen(true);
    };

    const closePopover = () => {
        setIsOpen(false);
    };

    return (
        <Popover
            isOpen={isOpen}
            position={['left', 'top']} // if you'd like, you can limit the positions
            padding={10} // adjust padding here!
            reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
            content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                <div>
                    { content }
                </div>
            )}
        >
            <div onMouseOver={openPopover} onMouseLeave={closePopover}>{ children }</div>
        </Popover>
    )
}

export default CustomPopover;