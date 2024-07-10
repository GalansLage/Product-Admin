"use client"
import { deleteDocument, getCollections } from "@/lib/firebase";
import { CreateUpdateItem } from "./create-update-item.form";
import { useUser } from "@/hooks/use-users";
import { useEffect, useState } from "react";
import { TableView } from "./table-view";
import { Product } from "@/interfaces/product.interface";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import toast from "react-hot-toast";



const Items = () => {
    const user = useUser();

    const [items, setItems] = useState<Product[]>([])

    const [isLoading, setisLoading] = useState<boolean>(true);

    const getItems = async () => {

        const path = `users/${user?.uid}/products`;
        setisLoading(true);
        try {
            const res = await getCollections(path) as Product[];

            setItems(res);

        } catch (error) {

        } finally {
            setisLoading(false);
        }

    }

    // === Delete item ===
    const deleteItem = async (item: Product) => {
        setisLoading(true);
        const path = `users/${user?.uid}/products/${item.id}`;

        try {

            await deleteDocument(path);
            toast.success('Item updated successfully');
            const newItems = items.filter(i => i.id !== item.id);
            setItems(newItems);
        } catch (error: any) {
            toast.error(error.message, { duration: 2500 });

        } finally {
            setisLoading(false);
        }

    }

    useEffect(() => {

        if (user) getItems();

    }, [user])


    return (
        <>
            <div className=" flex justify-between items-center m-4 mb-8 ">
                <h1 className=" text-2xl ml-1 ">
                    My Products
                </h1>

                <CreateUpdateItem getItems={getItems}>
                    <Button className="p-6">
                        Create
                        <CirclePlus className=" ml-2 w-[20px] " />
                    </Button>
                </CreateUpdateItem>

            </div>
            <TableView
                isLoading={isLoading}
                deleteItem={deleteItem}
                getItems={getItems}
                items={items} />

        </>
    )

}

export default Items;