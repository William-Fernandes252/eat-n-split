import { Button } from "@/components/ui/button";
import DinamicDialog from "@/components/ui/dinamic-dialog";
import { useFriends } from "@/contexts/friends";
import type React from "react";

type DeleteFriendDialogProps = React.PropsWithChildren<{
	friend: Friend;
	onClose?: () => void;
}>;

export default function DeleteFriendDialog({
	children,
	friend,
	onClose,
}: DeleteFriendDialogProps) {
	const { remove, select } = useFriends();
	return (
		<DinamicDialog
			title="Delete friend"
			description="Are you sure you want to delete this friend?"
			onClose={onClose}
			action={
				<Button
					variant="destructive"
					onClick={() => {
						remove(friend.id);
						onClose?.();
						select(null);
					}}
				>
					Delete
				</Button>
			}
		>
			{children}
		</DinamicDialog>
	);
}
