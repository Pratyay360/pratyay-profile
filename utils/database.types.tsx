export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[]

export interface Database {
	public: {
		Tables: {
			certificate: {
				Row: {
					title: string | null
					description: string |null
					imageSrc: string | null
					link: string | null
				}
				Relationships: []
			},
			project: {
				Row: {
					category: string | null
					description: string | null
					title: string | null
					imageSrc: string | null
					link: string | null
				}
				Relationships: []
			},
			social_link: {
				Row: {
					name: string | null
					link: string | null
					image: string | null
				}
				Relationships: []
			},
			technology: {
				Row: {
					name: string | null
					href: string | null
					src: string | null
				}
				Relationships: []
			},
			education: {
				Row: {
					category: string | null
					date_from: number | null
					date_to: number | null
					description: string | null
					title: string | null
				}
				Relationships: []
			},
			description: {
				Row: {
					word: string | null
				}
				Relationships: []
			},
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}