import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFriends } from "@/contexts/friends";
import { cn, initials } from "@/lib/utils";

type FriendItemProps = {
	friend: Friend;
};

export default function FriendItem({ friend }: FriendItemProps) {
	const { select, selected } = useFriends();
	const isSelected = selected?.id === friend.id;

	const absoluteBalance = Math.abs(friend.balance);

	function toggle() {
		if (isSelected) {
			select(null);
		} else {
			select(friend.id);
		}
	}

	return (
		<li
			className={cn(
				"flex items-center gap-3 my-2 py-1 pl-1 rounded hover:bg-muted",
				{
					"bg-muted": isSelected,
				},
			)}
			onKeyUp={toggle}
			onClick={toggle}
		>
			<Avatar className="m-1">
				<AvatarImage src={friend.avatar} />
				<AvatarFallback>{initials(friend.name)}</AvatarFallback>
			</Avatar>
			<div className="flex grow flex-col justify-center basis-3/5 gap-0.5 px-2 py-1">
				<div>{friend.name}</div>
				{friend.balance === 0 && <p className="text-muted-foreground">Even</p>}
				{friend.balance > 0 && (
					<p className="text-green-500">Owes you {absoluteBalance}</p>
				)}
				{friend.balance < 0 && (
					<p className="text-red-500">You owe {absoluteBalance}</p>
				)}
			</div>
		</li>
	);
}
