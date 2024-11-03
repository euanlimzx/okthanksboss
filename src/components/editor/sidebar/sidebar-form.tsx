import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { DialogDemo } from "./popup";

const SidebarFormFields = () => {
  const form = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  //   TODO @EUAN: Change labels for these
  return (
    <Form {...form}>
      <DialogDemo />
      <DialogDemo />
      <DialogDemo />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="field1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field 1</FormLabel>
              <FormControl>
                <Input placeholder="Enter field 1" {...field} />
              </FormControl>
              <FormDescription>This is the first field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="field2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field 2</FormLabel>
              <FormControl>
                <Input placeholder="Enter field 2" {...field} />
              </FormControl>
              <FormDescription>This is the second field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="field3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field 3</FormLabel>
              <FormControl>
                <Input placeholder="Enter field 3" {...field} />
              </FormControl>
              <FormDescription>This is the third field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SidebarFormFields;
