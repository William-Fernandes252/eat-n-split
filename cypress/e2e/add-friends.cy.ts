describe("Add friends", () => {
	let friends: Record<string, unknown>[];

	beforeEach(() => {
		cy.fixture("friends").then((data) =>
			cy
				.visit("localhost:5173", {
					onBeforeLoad(win) {
						friends = data;
						win.localStorage.setItem("friends", JSON.stringify(data));
					},
				})
				.then(() => cy.get('[data-test="add-friend-button"]').click()),
		);
	});

	it("should add a friend", () => {
		const initial = friends.length;

		cy.get('[data-test="friend-name-input"]').type("William Fernandes");
		cy.get('[data-test="friend-avatar-input"]').type(
			"https://example.com/avatar.jpg",
		);
		cy.get('[data-test="add-friend-submit"]').click();

		cy.get('[data-test="friend-item"]').should("have.length", initial + 1);
	});

	it("should be cancellable", () => {
		cy.get('[data-test="cancel-action-button"]').click();
		cy.get("#add-friend-form").should("not.exist");
	});
});
