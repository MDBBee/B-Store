import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { SearchIcon } from 'lucide-react';

const Search = async () => {
  const categories = PRODUCT_CATEGORIES;

  return (
    <form action="/search" method="GET">
      <div className="flex w-full max-w-lg items-center space-x-2">
        <Select name="category">
          <SelectTrigger className="md:w-[80px] lg:w-[180px]">
            <SelectValue placeholder="category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((x) => (
              <SelectItem key={x.value} value={x.value} className="capitalize">
                {x.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name="q"
          type="text"
          autoComplete="off"
          placeholder="Search for any product"
          className="md:w-[100px] lg:w-[300px] focus:md:w-[150px] focus:lg:w-[450px] duration-200"
        />
        <Button className="md:w-[30px] md:h-[30px] lg:w-[80px] ">
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

export default Search;

// <form>
//   <FieldGroup>
//     {/* categories */}
//     <Controller
//       name="category"
//       control={form.control}
//       render={({ field, fieldState }) => (
//         <Field data-invalid={fieldState.invalid}>
//           <FieldLabel htmlFor="form-rhf-complex-billingPeriod">
//             CATEGORIES
//           </FieldLabel>
//           <Select
//             name={field.name}
//             value={field.value}
//             onValueChange={field.onChange}
//           >
//             <SelectTrigger
//               id="form-rhf-complex-billingPeriod"
//               aria-invalid={fieldState.invalid}
//             >
//               <SelectValue placeholder="category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories.map((c) => (
//                 <SelectItem
//                   key={c.value}
//                   value={c.value}
//                   className="capitalize"
//                 >
//                   {c.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//         </Field>
//       )}
//     />
//     <DropdownMenuSeparator />
//     {/* Price */}
//     <Controller
//       name="price"
//       control={form.control}
//       render={({ field }) => (
//         <Field className="w-full max-w-xs">
//           <FieldTitle>PRICE</FieldTitle>
//           <FieldDescription>
//             Range (€
//             <span className="font-medium tabular-nums">
//               {field.value[0]}
//             </span>{' '}
//             -{' '}
//             <span className="font-medium tabular-nums">
//               {field.value[1]}
//             </span>
//             ).
//           </FieldDescription>

//           <Slider
//             value={field.value}
//             onValueChange={(value) => field.onChange(value)}
//             max={5000}
//             min={0}
//             step={10}
//             className="mt-2 w-full"
//             aria-label="Price Range"
//           />
//           {/* <FieldSlider /> */}
//         </Field>
//       )}
//     />

//     <DropdownMenuSeparator />

//     {/* ratings */}
//     <Controller
//       name="rating"
//       control={form.control}
//       render={({ field, fieldState }) => (
// <Field data-invalid={fieldState.invalid}>
//   <FieldLabel htmlFor="form-rhf-complex-billingPeriod">
//     RATINGS
//   </FieldLabel>
//   <Select
//     name={field.name}
//     value={field.value}
//     onValueChange={field.onChange}
//   >
//     <SelectTrigger
//       id="form-rhf-complex-billingPeriod"
//       aria-invalid={fieldState.invalid}
//     >
//       <SelectValue placeholder="Select" />
//     </SelectTrigger>
//     <SelectContent>
//       {ratings.map((c) => (
//         <SelectItem key={c.value} value={c.value}>
//           {c.label}
//         </SelectItem>
//       ))}
//     </SelectContent>
//   </Select>
//   {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
// </Field>
//       )}
//     />
//   </FieldGroup>
//   <DropdownMenuSeparator className="mt-2" />

//   <div className="flex justify-between items-center flex-wrap gap-2 mt-4">
//     <Button type="button" variant="outline" onClick={() => form.reset()}>
//       Reset
//     </Button>

//     <Button type="submit" form="form-rhf-demo">
//       <Filter /> Apply
//     </Button>
//   </div>
// </form>
