"use client"

import Link from 'next/link';
import animations from '@/lib/animations';
// import { useTransitionRouter } from 'next-view-transitions';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';


const NavLink = ({ href, children, className, aniType }: { href: string, children: ReactNode, className?: string, aniType?: string }) => {
    const router = useRouter();
    function handleClick() {
        if (aniType && event) {
            event.preventDefault();
            let ani = animations.pageRightToLeft;
            switch(aniType) {
                case 'back':
                    ani = animations.pageRightToLeft;
                break;
                case 'forward':
                    ani = animations.pageLeftToRight;
                break;
                case 'fadeOut':
                    ani = animations.fadeOut;
                break;

            }

            console.log('HELLO - ', (event.target as HTMLLinkElement).href);
            console.log((event));
            console.log(href);

            if ((event.target as HTMLLinkElement).href) {
                router.push((event.target as HTMLLinkElement).href);
            } else {
                router.push(href);
            }
        }
    }


/*
    const router = useTransitionRouter();
    function handleClick() {
        if (aniType && event) {
            event.preventDefault();
            let ani = animations.pageRightToLeft;
            switch(aniType) {
                case 'back':
                    ani = animations.pageRightToLeft;
                break;
                case 'forward':
                    ani = animations.pageLeftToRight;
                break;
                case 'fadeOut':
                    ani = animations.fadeOut;
                break;

            }

            console.log('HELLO - ', (event.target as HTMLLinkElement).href);
            console.log((event));
            console.log(href);

            if ((event.target as HTMLLinkElement).href) {
                router.push((event.target as HTMLLinkElement).href, {
                    onTransitionReady: ani
                });
            } else {
                router.push(href, {
                    onTransitionReady: ani
                });
            }
        }
    }

*/
    return <Link href={href} className={className} onClick={handleClick}>{ children }</Link>
}

export default NavLink;