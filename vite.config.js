import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
	base: "/coreday/",
	plugins: [
		svelte(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
			manifest: {
				name: 'Coreday - Modular Life Manager',
				short_name: 'Coreday',
				description: 'Offline-first modular life manager',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: "image/png"
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: "image/png"
					}
				]
			}
		})
	],
})
