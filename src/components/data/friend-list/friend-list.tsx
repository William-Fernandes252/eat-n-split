import { useFriends } from "@/contexts/friends";
import { cn } from "@/lib/utils";
import FriendItem from "../friend-item/friend-item";

type FriendListProps = {
	className?: string;
};

export default function FriendList({ className }: FriendListProps) {
	const { friends } = useFriends();
	return (
		<ul className={cn("list-none", className)}>
			{[...friends.values()].map((friend) => (
				<FriendItem key={friend.id} friend={friend} />
			))}
		</ul>
	);
}
