'use client';

import { createListCollection } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '~/components/ui/select';

interface Item {
    value: string;
    label: string;
}

interface Props {
    items: Item[];
    label: string;
    name: string;
    value: string[];
    onValueChange: ({ value }: { value: string[] }) => void;
    onInteractOutside: () => void;
}

const SimpleSelectBase = ({ items, label, ...rest }: Props) => {
    const collection = createListCollection({ items });
    return (
        <SelectRoot size="md" multiple={false} {...rest} collection={collection}>
            <SelectTrigger>
                <SelectValueText placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
                {collection.items.map((item) => (
                    <SelectItem item={item} key={String(item.value)}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};

export const SimpleSelect = ({ items, label, name }: { items: Item[]; label: string; name: string }) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <SimpleSelectBase
                    items={items}
                    label={label}
                    name={field.name}
                    value={[field.value] as string[]}
                    onValueChange={({ value }: { value: string[] }) => {
                        field.onChange(value[0]);
                    }}
                    onInteractOutside={() => field.onBlur()}
                />
            )}
        />
    );
};
