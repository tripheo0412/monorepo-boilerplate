import React from 'react'
import type {Message} from 'types'

/**
 * Home page rendered at the root route.
 *
 * @returns {React.ReactElement} The page content.
 */
export default function Home(): React.ReactElement {
	const msg: Message = {text: 'Hello from Next.js'}
	return <div>{msg.text}</div>
}
