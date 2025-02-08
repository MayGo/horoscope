'use client';

import { createListCollection } from '@chakra-ui/react';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '~/components/ui/select';

interface Item {
    label: string;
    value: string;
}

export const SimpleSelect = ({ items, label }: { items: Item[]; label: string }) => {
    const collection = createListCollection({ items });
    return (
        <SelectRoot size="md" collection={collection}>
            <SelectTrigger>
                <SelectValueText placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
                {collection.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};
