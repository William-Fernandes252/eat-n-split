import { createContext, useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type FriendsContextType = {
	/**
	 * A map of friends by their ID.
	 */
	friends: Map<Friend["id"], Friend>;

	/**
	 * The currently selected friend.
	 */
	selected: Friend | null;

	/**
	 * Adds a friend to the list.
	 *
	 * @param friend The friend to add.
	 * @returns The ID of the added friend.
	 */
	add: (friend: Omit<Friend, "id">) => void;

	/**
	 * Removes a friend from the list.
	 *
	 * @param id The ID of the friend to remove.
	 */
	remove: (id: Friend["id"]) => void;

	/**
	 * Updates a friend in the list.
	 *
	 * @param id The ID of the friend to update.
	 * @param friend The updated friend.
	 */
	update: (id: Friend["id"], friend: Partial<Friend>) => void;

	/**
	 * Selects a friend.
	 */
	select: (id: Friend["id"] | null) => void;
};

function persist(friends: FriendsContextType["friends"]) {
	localStorage.setItem(
		"friends",
		JSON.stringify(Array.from(friends.entries())),
	);
}

function restore(): FriendsContextType["friends"] {
	const friends = localStorage.getItem("friends");
	if (friends) {
		return new Map(JSON.parse(friends));
	}
	return new Map();
}

const FriendsContext = createContext<FriendsContextType | null>(null);

export function FriendsContextProvider({ children }: React.PropsWithChildren) {
	const [friends, setFriends] = useState(restore);
	const [selected, setSelected] = useState<Friend | null>(null);

	const add = useCallback((friend: Omit<Friend, "id">) => {
		setFriends((friends) => {
			const id = uuidv4();
			friends.set(id, { ...friend, id });
			persist(friends);
			return new Map(friends);
		});
	}, []);

	const remove = useCallback((id: Friend["id"]) => {
		setFriends((friends) => {
			friends.delete(id);
			persist(friends);
			return new Map(friends);
		});
	}, []);

	const update = useCallback((id: Friend["id"], friend: Partial<Friend>) => {
		setFriends((friends) => {
			const current = friends.get(id);
			friends.set(id, Object.assign({}, current, friend));
			persist(friends);
			return new Map(friends.entries());
		});
	}, []);

	const select = useCallback(
		(id: Friend["id"] | null) => {
			setSelected(id ? friends.get(id) ?? null : null);
		},
		[friends],
	);

	return (
		<FriendsContext.Provider
			value={{ friends, add, remove, update, select, selected }}
		>
			{children}
		</FriendsContext.Provider>
	);
}

/**
 * Hook to use the friends context.
 *
 * @returns The current friends context.
 * @throws If the hook is used outside of a FriendsContextProvider.
 */
export function useFriends(): FriendsContextType {
	const context = useContext(FriendsContext);
	if (!context) {
		throw new Error("useFriends must be used within a FriendsContextProvider");
	}
	return context;
}
