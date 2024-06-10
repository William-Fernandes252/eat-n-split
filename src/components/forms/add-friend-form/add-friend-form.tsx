import { Button } from "@/components/ui/button";
import DinamicDialog from "@/components/ui/dinamic-dialog";
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
import { useFriends } from "@/contexts/friends";
import { randomAvatar } from "@/lib/avatars";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { z } from "zod";

type AddFriendFormProps = {
	open?: boolean;
	onClose: () => void;
};

export default function AddFriendForm({ open, onClose }: AddFriendFormProps) {
	const addFriendSchema = z.object({
		name: z.string().min(1, "The name must not be empty"),
		avatar: z.string().url().optional().or(z.literal("")),
	});
	const title = "Add a friend";
	const description =
		"Add a friend to your friend list by providing their name and an optional avatar URL.";

	const { add } = useFriends();
	const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
	const form = useForm<z.infer<typeof addFriendSchema>>({
		defaultValues: {
			name: "",
			avatar: "",
		},
		resolver: zodResolver(addFriendSchema),
	});

	function onSubmit(values: z.infer<typeof addFriendSchema>) {
		add({
			...values,
			balance: 0,
			avatar: values.avatar?.length ? values.avatar : randomAvatar(values.name),
		});
		onClose();
	}

	const content = (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("space-y-3", { "p-4 pt-0": !isLargeScreen })}
				id="add-friend-form"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Hilary Hahn" {...field} />
							</FormControl>
							<FormDescription>Enter the name of your friend.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="avatar"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Avatar</FormLabel>
							<FormControl>
								<Input
									placeholder="https://example.com/avatar.jpg"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Enter the URL of your friend's avatar.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);

	return (
		<DinamicDialog
			open={open}
			onClose={onClose}
			title={title}
			description={description}
			action={
				<Button type="submit" form="add-friend-form">
					Add friend
				</Button>
			}
			content={content}
		/>
	);
}
