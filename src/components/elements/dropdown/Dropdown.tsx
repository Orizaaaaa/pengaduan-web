import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import React from 'react'

type Props = {
    clearButton: any
    onSelect: any
    defaultItems: any
    children: any
    defaultSelectedKey?: string

}

const DropdownCustom = ({ clearButton, onSelect, defaultItems, children, defaultSelectedKey }: Props) => {
    return (
        <Autocomplete
            aria-label='dropdown'
            clearButtonProps={clearButton}
            onSelectionChange={onSelect}
            defaultItems={defaultItems}
            defaultSelectedKey={defaultSelectedKey}
            className="max-w-xs border-2 border-primary rounded-lg "
            size='sm'
        >
            {children}
        </Autocomplete>
    )
}

export default DropdownCustom