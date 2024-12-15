import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Command, CommandInput, CommandItem, CommandList } from "cmdk";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const options = ["Apple", "Grapes", "Pineapple", "Grapefruit"];

export default function ComboBox() {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <input
                    placeholder="Type to search..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setOpen(true)} // Open dropdown on focus
                    style={{
                        padding: "8px",
                        width: "200px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
            </Popover.Trigger>
            <Popover.Content
                side="bottom"
                align="start"
                style={{
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    width: "200px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <ScrollArea style={{ maxHeight: "150px" }}>
                    <Command>
                        <CommandInput
                            placeholder="Search..."
                            value={inputValue}
                            onValueChange={(value) => setInputValue(value)}
                        />
                        <CommandList>
                            {options
                                .filter((item) =>
                                    item.toLowerCase().includes(inputValue.toLowerCase())
                                )
                                .map((item) => (
                                    <CommandItem
                                        key={item}
                                        value={item}
                                        onSelect={(value) => {
                                            setInputValue(value);
                                            setOpen(false); // Close dropdown on select
                                        }}
                                        style={{
                                            padding: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {item}
                                    </CommandItem>
                                ))}
                        </CommandList>
                    </Command>
                </ScrollArea>
            </Popover.Content>
        </Popover.Root>
    );
}
