import React, {useState} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"

function FilterCard({buttonLabel, setButtonLabel}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div className={"card text-white bg-dark border border-info"}>
            <div className="card-header lead">
                Filter your results
            </div>
            <div className="card-body">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle className={"btn btn-success"} caret>
                        {buttonLabel}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Select Price Range</DropdownItem>
                        <DropdownItem onClick={() => {
                            setButtonLabel("Below $10")
                        }}>Below $10</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => {
                            setButtonLabel("$10 - $30")
                        }}>$10 - $30</DropdownItem>
                        <DropdownItem onClick={() => {
                            setButtonLabel("Above $30")
                        }}>Above $30</DropdownItem>
                        <DropdownItem onClick={() => {
                            setButtonLabel("No filters selected")
                        }}>Remove all filters</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}

export default FilterCard;