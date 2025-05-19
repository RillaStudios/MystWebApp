/* 
This is a empty layout component. It is used for pages that do 
not require any layout. An example of this is the login page.

@author: IFD
@since: 2025-05-14
*/
export default function EmptyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}