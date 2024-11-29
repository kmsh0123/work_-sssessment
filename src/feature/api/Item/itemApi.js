import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itemApi = createApi({
    reducerPath:"itemApi",
    baseQuery:fetchBaseQuery({baseUrl:
        import.meta.env.VITE_API_ENDPOINT
    }),
    tagTypes:["itemApi"],

    endpoints:(builder) => ({
        getItem:builder.query({
            query:(token) => ({
                url : "get",
                method : "GET",
                headers: {authorization : `Bearer ${token}`}
            }),
            providesTags:["itemApi"],
        }),
        createItem:builder.mutation({
            query:({formData,token}) => ({
                url : "create",
                method : "POST",
                body : formData,
                headers: {authorization : `Bearer ${token}`}
            }),
            invalidatesTags:["itemApi"],
        }),
        getItemDetail:builder.query({
            query:({token,id}) => ({
                url : `get/${id}`,
                method : "GET",
                headers: {authorization : `Bearer ${token}`}
            }),
            providesTags:["itemApi"],
        }),
        deleteItem:builder.mutation({
            query:({token,id}) => ({
                url : `delete/${id}`,
                method : "DELETE",
                headers: {authorization : `Bearer ${token}`}
            }),
            invalidatesTags:["itemApi"],
        }),
        updateItem:builder.mutation({
            query:({id,formData,token}) => ({
                url : `update/${id}`,
                method : "PATCH",
                body : formData,
                headers: {authorization : `Bearer ${token}`}
            }),
            invalidatesTags:["itemApi"],
        }),
        
    })
})
export const {useGetItemQuery,useCreateItemMutation,useGetItemDetailQuery,useDeleteItemMutation,useUpdateItemMutation} = itemApi;