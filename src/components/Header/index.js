import ThemeSwitcher from "../ThemeSwitcher";

export default function Header() {
	return (
		<div className='flex justify-between items-center bg-black text-white h-[50px] px-4'>
			<ThemeSwitcher className='flex-shrink-0' />
			<h1 className='text-3xl text-center absolute left-1/2 transform -translate-x-1/2'>
				Ceny Złota 🤑💰
			</h1>
		</div>
	);
}
