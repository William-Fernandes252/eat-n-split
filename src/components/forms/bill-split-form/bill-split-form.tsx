import FriendOptionsMenu from "@/components/menus/friend-options-menu";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useFriends } from "@/contexts/friends";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { z } from "zod";

type BillSplitFormProps = {
	className?: string;
	friend: Friend;
	onSuccess?: () => void;
};

export default function BillSplitForm({
	className,
	friend,
	onSuccess,
}: BillSplitFormProps) {
	const payerOptions = ["You", friend.name] as const;
	const billSplitSchema = z
		.object({
			bill: z.coerce.number().positive(),
			my: z.coerce.number().positive(),
			friend: z.coerce.number().positive(),
			payer: z.enum(payerOptions),
		})
		.refine((data) => data.bill === data.my + data.friend, {
			message:
				"The sum of your share and your friend's share must equal the bill value",
			path: ["bill"],
		});

	const { select, update } = useFriends();
	const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
	const form = useForm<z.infer<typeof billSplitSchema>>({
		defaultValues: {
			bill: 0,
			my: 0,
			friend: 0,
			payer: "You",
		},
		resolver: zodResolver(billSplitSchema),
	});

	const title = `Split a bill with ${friend.name}`;
	const description =
		"Provide the total amount of the bill, who paid it, and how much each person owes.";

	function onSubmit(values: z.infer<typeof billSplitSchema>) {
		if (values.payer === "You") {
			update(friend.id, {
				balance: friend.balance + values.friend,
			});
		} else {
			update(friend.id, {
				balance: friend.balance - values.my,
			});
		}
		onSuccess?.();
	}

	function cancel() {
		select(null);
	}

	const content = (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, console.error.bind(console))}
				className={cn("space-y-3", className, { "p-4 pb-0": !isLargeScreen })}
				id="bill-split-form"
			>
				<FormField
					control={form.control}
					name="bill"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bill value</FormLabel>
							<FormControl>
								<Input placeholder="0.00" type="number" {...field} />
							</FormControl>
							<FormDescription>
								Enter the value of the shared expense.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="my"
					render={({ field }) => (
						<FormItem>
							<FormLabel>My share</FormLabel>
							<FormControl>
								<Input placeholder="0.00" type="number" {...field} />
							</FormControl>
							<FormDescription>Enter the amount you paid.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="friend"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{friend.name}'s share</FormLabel>
							<FormControl>
								<Input placeholder="0.00" type="number" {...field} />
							</FormControl>
							<FormDescription>
								Enter the amount {friend.name} paid.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="payer"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Who payed the bill?</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Payer" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{payerOptions.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								Specify the person who paid the bill.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);

	const submitButton = (
		<Button type="submit" form="bill-split-form">
			Split bill
		</Button>
	);

	return isLargeScreen ? (
		<Card className={cn(className, "relative")}>
			<FriendOptionsMenu friend={friend}>
				<Button
					size="icon"
					className="absolute top-2 right-2 rounded-full border-none"
					variant="outline"
				>
					<EllipsisVertical />
				</Button>
			</FriendOptionsMenu>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{content}</CardContent>
			<CardFooter className="gap-3">
				{submitButton}
				<Button variant="outline" onClick={cancel}>
					Cancel
				</Button>
			</CardFooter>
		</Card>
	) : (
		<Drawer open={!!friend} onClose={cancel}>
			<DrawerContent>
				<ScrollArea className="mx-auto w-full max-w-sm h-96">
					<DrawerHeader>
						<DrawerTitle>{title}</DrawerTitle>
						<DrawerDescription>{title}</DrawerDescription>
					</DrawerHeader>
					{content}
					<DrawerFooter>
						{submitButton}
						<DrawerClose asChild>
							<Button variant="outline" onClick={cancel}>
								Cancel
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	);
}
