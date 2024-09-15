import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export function useStoreUserEffect() {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const user = useQuery(api.users.getUser, { user_id: "users" as Id<"users"> }); // Replace "current_user_id" with the actual user ID
    // When this state is set we know the server
    // has stored the user.
    const [userId, setUserId] = useState<Id<"admin"> | null>(null);
    const storeUser = useMutation(api.admin.store);

    useEffect(() => {
        // If the user is not logged in or user data is not available, don't do anything
        if (!isAuthenticated || !user) {
            return;
        }
        // Store the user in the database.
        // Recall that `storeUser` gets the user information via the `auth`
        // object on the server. You don't need to pass anything manually here.
        async function createUser() {
            const id = await storeUser();
            // Check if the returned ID is of type "admin"
            if (id.__tableName === "admin") {
                setUserId(id as Id<"admin">);
            } else {
                console.error("Unexpected ID type returned:", id.__tableName);
            }
        }
        createUser();
        return () => setUserId(null);
        // Make sure the effect reruns if the user logs in with
        // a different identity
    }, [isAuthenticated, storeUser, user?._id, user]);

    // Combine the local state with the state from context
    return {
        isLoading: isLoading || (isAuthenticated && userId === null),
        isAuthenticated: isAuthenticated && userId !== null,
    };
}