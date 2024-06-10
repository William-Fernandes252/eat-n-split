import DeleteFriendDialog from "@/components/dialogs/delete-friend-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";

type FriendOptionsMenuProps = React.PropsWithChildren<{
	friend: Friend;
}>;

export default function FriendOptionsMenu({
	children,
	friend,
}: FriendOptionsMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Friend options</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DeleteFriendDialog friend={friend}>
					<DropdownMenuItem
						onSelect={(e) => {
							e.preventDefault();
						}}
					>
						<Trash2 className="mr-2 h-4 w-4 text-destructive" />
						<span className="text-destructive">Delete</span>
					</DropdownMenuItem>
				</DeleteFriendDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
