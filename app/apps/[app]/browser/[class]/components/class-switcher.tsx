"use client"

import * as React from "react"
import Parse from "parse"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSchemas } from "../../hooks/schema"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"

export const SpecialClasses = [
  '_User',
  '_Installation',
  '_Role',
  '_Product',
  '_Session',
  '_PushStatus',
];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ClassSwitcherProps extends PopoverTriggerProps {
  schema: Parse.RestSchema;
  onSchemaChange: (schema: Parse.RestSchema) => void;
  className?: string;
}

export default function ClassSwitcher({ schema, onSchemaChange, className }: ClassSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

  const schemas = useSchemas();
  const groups = React.useMemo(() => {
    return [
      {
        label: "Built-in",
        schemas: schemas[0],
      }, {
        label: "Custom",
        schemas: schemas[1],
      }
    ]
  }, [schemas]);

  const [selectedSchema, setSelectedSchema] = React.useState<Parse.RestSchema>(schema)
  // const form = useForm();

  let availableClasses = ['Custom'];
  for (let raw of SpecialClasses) {
    if (raw !== '_Session' && schemas[0].filter(schema => schema.className === raw).length === 0) {
      availableClasses.push(raw);
    }
  }

  const [classType, setClassType] = React.useState(availableClasses[0]);


  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a class"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedSchema.className}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search class..." />
              <CommandEmpty>No class found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.schemas.map((schema) => (
                    <CommandItem
                      key={schema.className}
                      onSelect={() => {
                        setSelectedSchema(schema);
                        setOpen(false);
                        onSchemaChange(schema);
                      }}
                      className="text-sm"
                    >
                      {schema.className}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedSchema.className === schema.className
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create a Class
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new class?</DialogTitle>
          <DialogDescription>
            This creates a new class to hold objects.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="plan">What type of class do you need?</Label>
              <Select defaultValue={classType} onValueChange={ (value) => {
                setClassType(value);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class type" />
                </SelectTrigger>
                <SelectContent>
                  {availableClasses.map((availableClassName) => (
                    <SelectItem key={availableClassName} value={availableClassName}>
                      <span className="font-medium">{availableClassName}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {classType === availableClasses[0] && <div className="space-y-2">
              <Label htmlFor="name">What should we call it?</Label>
              <Input id="name" placeholder="Give it a good name..." />
              <DialogDescription>Don’t use any special characters, and start your name with a letter.</DialogDescription>
            </div>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => {
            console.log('create & add columns');
          }}>Create & add columns</Button>
          <Button type="submit" onClick={() => {
            console.log('create class');
          }}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
