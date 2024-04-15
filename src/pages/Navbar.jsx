import React from 'react'

export default function Navbar() {
  return (
    <>
    <body class="bg-blue-500">
	<nav class="relative px-4 py-4 flex justify-between items-center h-14 bg-white">
		<a class="text-3xl font-bold leading-none" href="#">
			<svg class="h-6" alt="logo" viewBox="0 0 10240 10240">
			</svg>
		</a>
		<a class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="/login">Sign In</a>
		<a class="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="/signup">Sign up</a>
	</nav>
</body>
</>

  )
}
