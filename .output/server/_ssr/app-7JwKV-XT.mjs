import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-aspect-ratio+[...].mjs";
import { a as CardTitle, i as CardHeader, t as Card } from "./card-Bfif-6-K.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Image } from "../_libs/unpic__react.mjs";
import { t as BlogCard } from "./blogCard-Cz0YJHJT.mjs";
import { t as CertCard } from "./certificateCard-CtxAhcrF.mjs";
import { t as createClient } from "./server-D9mWckOW.mjs";
import { t as ProjectCard } from "./projectCard-B0o-de_a.mjs";
import { n as SkeletonTheme, t as Skeleton } from "../_libs/react-loading-skeleton.mjs";
import { a as AnimatePresence, i as motion, n as useTransform, r as useMotionValue, t as useSpring } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-7JwKV-XT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BackgroundCircles() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 -z-10 flex items-center justify-center overflow-hidden",
		children: [[
			{
				size: 330,
				color: "border-gray-400/30 dark:border-gray-600/30",
				animate: "animate-ping"
			},
			{
				size: 400,
				color: "border-red-400/40 dark:border-red-500/40",
				animate: "animate-pulse"
			},
			{
				size: 500,
				color: "border-orange-400/40 dark:border-orange-500/40",
				animate: "animate-ping"
			},
			{
				size: 650,
				color: "border-yellow-400/30 dark:border-yellow-500/30",
				animate: "animate-pulse"
			},
			{
				size: 700,
				color: "border-green-500/20 dark:border-green-400/20",
				animate: "animate-ping"
			},
			{
				size: 850,
				color: "border-gray-300/10 dark:border-white/10",
				animate: "animate-pulse"
			}
		].map(({ size, color, animate }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `absolute rounded-full border ${color} ${animate} blur-[2px] opacity-70`,
			style: {
				width: `${size}px`,
				height: `${size}px`,
				animationDuration: `${4 + i * .5}s`,
				animationDelay: `${i * .2}s`,
				borderStyle: "solid",
				borderWidth: `${1 + i * .5}px`
			}
		}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute w-225 h-[900px] rounded-full border border-gray-300/5 dark:border-white/5 blur-[1px]" })]
	});
}
function WordRotate({ words, duration = 2500, framerProps = {
	initial: {
		opacity: 0,
		y: -50
	},
	animate: {
		opacity: 1,
		y: 0
	},
	exit: {
		opacity: 0,
		y: 50
	},
	transition: {
		duration: .25,
		ease: "easeOut"
	}
}, className }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % words.length);
		}, duration);
		return () => clearInterval(interval);
	}, [words, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden py-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
				className: cn(className),
				...framerProps,
				children: words[index]
			}, words[index])
		})
	});
}
function Photo() {
	const [words, setWords] = (0, import_react.useState)(["Full-Stack Developer", "UI/UX Enthusiast"]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchWords() {
			try {
				const { data } = await (await createClient()).from("description").select("word");
				if (data && data.length > 0) setWords(data.map((c) => c.word));
			} catch (err) {
				console.error("Supabase fetch error:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchWords();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundCircles, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
					src: "https://wekwttnnowtwqzntesch.supabase.co/storage/v1/object/public/images/img.webp",
					alt: "Pratyay Mitra Mustafi",
					width: 300,
					height: 300,
					className: "object-cover rounded-full transform-gpu transition-all hover:scale-125"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "z-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl",
				children: "Hi, I'm Pratyay Mitra Mustafi"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "z-10 mt-6 h-14 text-xl font-medium text-muted-foreground md:text-2xl",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					width: 260,
					height: 32
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordRotate, { words })
			})
		]
	}) });
}
function AboutSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl lg:max-w-5xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				count: 3,
				height: 24,
				className: "mb-4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				count: 2,
				height: 24,
				width: "80%",
				className: "mb-4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				count: 1,
				height: 24,
				width: "60%"
			})
		]
	});
}
function AboutMe() {
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchAbout() {
			try {
				const { data: aboutData } = await (await createClient()).from("about").select("word");
				if (aboutData) setData(aboutData);
			} catch (err) {
				console.error("Error fetching about data:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchAbout();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center text-3xl sm:text-5xl font-bold tracking-widest uppercase mb-16",
				children: "About Me"
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutSkeleton, {}) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground italic text-lg",
				children: "Nothing here yet. Check back soon!"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-4xl lg:max-w-5xl mx-auto space-y-6",
				children: data.map(({ word }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg md:text-xl leading-relaxed text-foreground",
					children: word
				}, i))
			})]
		})
	});
}
function DonationCard(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: props.link,
		target: "_blank",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full overflow-hidden transform transition-all hover:scale-110",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
				className: "lg:h-48 md:h-36 w-full object-center",
				src: props.image,
				alt: props.name,
				width: 200,
				height: 45
			})
		})
	}) });
}
function EducationCard({ date_from, date_to, category, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex flex-col md:flex-row gap-4 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "md:w-64 shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-xl",
				children: category
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm ",
				children: [
					date_from,
					" – ",
					date_to
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold mb-1",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg text-muted-foreground",
				children: description
			})]
		})]
	});
}
function ImageCard(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: props.link || "",
		target: "_blank",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
			src: props.image || "",
			alt: props.name || "",
			width: 40,
			height: 40
		})
	}) });
}
function Education() {
	const [education, setEducation] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchEducation() {
			try {
				const { data } = await (await createClient()).from("education").select("*").order("date_from", { ascending: false });
				if (data) setEducation(data);
			} catch (err) {
				console.error("Error fetching education:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchEducation();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SkeletonTheme, {
		baseColor: "#e0e0e0",
		highlightColor: "#f5f5f5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold p-3",
			children: "EDUCATION"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "body-font overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container px-5 py-24 mx-auto items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "-my-8 divide-y-2 px-0 sm:px-20 items-center justify-center",
					children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { count: 7 }), education.map((edu, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-8 flex flex-wrap md:flex-nowrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EducationCard, {
							title: edu.title,
							category: edu.category,
							date_from: edu.date_from,
							date_to: edu.date_to,
							description: edu.description
						})
					}, index))]
				})
			})
		})]
	}) });
}
var DEFAULT_MAGNIFICATION = 60;
var DEFAULT_DISTANCE = 140;
var dockVariants = cva("mx-auto w-max mt-8 h-[58px] p-2 flex gap-2 rounded-2xl border supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md");
var Dock = import_react.forwardRef(({ className, children, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE, direction = "bottom", ...props }, ref) => {
	const mouseX = useMotionValue(Infinity);
	const renderChildren = () => {
		return import_react.Children.map(children, (child) => {
			return import_react.cloneElement(child, {
				mouseX,
				magnification,
				distance
			});
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		onMouseMove: (e) => mouseX.set(e.pageX),
		onMouseLeave: () => mouseX.set(Infinity),
		...props,
		className: cn(dockVariants({ className }), {
			"items-start": direction === "top",
			"items-center": direction === "middle",
			"items-end": direction === "bottom"
		}),
		children: renderChildren()
	});
});
Dock.displayName = "Dock";
var DockIcon = ({ size: _size, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE, mouseX, className, children, ...props }) => {
	const ref = (0, import_react.useRef)(null);
	let width = useSpring(useTransform(useTransform(mouseX, (val) => {
		const bounds = ref.current?.getBoundingClientRect() ?? {
			x: 0,
			width: 0
		};
		return val - bounds.x - bounds.width / 2;
	}), [
		-distance,
		0,
		distance
	], [
		40,
		magnification,
		40
	]), {
		mass: .1,
		stiffness: 150,
		damping: 12
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		style: { width },
		className: cn("flex aspect-square cursor-pointer items-center justify-center rounded-full", className),
		...props,
		children
	});
};
DockIcon.displayName = "DockIcon";
function Skills() {
	const [technology, setTechnology] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function fetchSkills() {
			try {
				const { data, error: fetchError } = await (await createClient()).from("technology").select("*");
				if (fetchError) {
					console.error("Error fetching skills:", fetchError);
					setError(fetchError.message);
				}
				if (data) setTechnology(data);
			} catch (err) {
				console.error("Error fetching skills:", err);
				setError("Failed to load skills");
			} finally {
				setLoading(false);
			}
		}
		fetchSkills();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SkeletonTheme, {
		baseColor: "#e0e0e0",
		highlightColor: "#f5f5f5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold",
				role: "heading",
				"aria-level": 1,
				children: "SKILLS"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 mt-10 text-center text-red-500",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Unable to load skills at the moment. Please try again later." })
			}),
			loading && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					count: 1,
					height: 40
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2 relative flex-auto flex-wrap overflow-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {
					direction: "middle",
					magnification: 60,
					distance: 100,
					children: technology.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
						className: "bg-black/10 dark:bg-white/10 p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCard, {
							link: item.href,
							image: item.src,
							name: item.name
						})
					}, index))
				})
			})
		]
	}) });
}
function Certificates() {
	const [certificate, setCertificate] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchCertificates() {
			try {
				const { data } = await (await createClient()).from("certificate").select("*");
				if (data) setCertificate(data);
			} catch (err) {
				console.error("Error fetching certificates:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchCertificates();
	}, []);
	const count = certificate.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SkeletonTheme, {
		baseColor: "#e0e0e0",
		highlightColor: "#f5f5f5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-column text-center items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-center items-center justify-center top-36 tracking-[20px] text-2xl/3 lg:text-4xl font-bold p-3 m-2 overflow-auto",
					children: "CERTIFICATES"
				})
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					height: 500,
					count: 1
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "body-font",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container px-5 py-24 mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap -m-4 justify-center whitespace-break-spaces",
						children: [count <= 3 ? certificate.map((cer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 md:w-1/3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertCard, {
								link: cer.link,
								imageSrc: cer.imageSrc,
								description: cer.description,
								title: cer.title
							})
						}, index)) : certificate.slice(0, 3).map((cer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 md:w-1/3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertCard, {
								link: cer.link,
								imageSrc: cer.imageSrc,
								description: cer.description,
								title: cer.title
							})
						}, index)), !loading && count > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full mt-6 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/certificates",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button-30",
									role: "button_more_certificate",
									children: "See More"
								})
							})
						})]
					})
				})
			})
		]
	}) });
}
function Projects() {
	const [project, setProject] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchProjects() {
			try {
				const { data } = await (await createClient()).from("project").select("*");
				if (data) setProject(data);
			} catch (err) {
				console.error("Error fetching projects:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchProjects();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SkeletonTheme, {
		baseColor: "#e0e0e0",
		highlightColor: "#f5f5f5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold",
				children: "PROJECTS"
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					count: 1,
					height: 500
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "body-font",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container px-5 py-24 mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap -m-4 justify-center",
						children: project.slice(0, 3).map((proj, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 md:w-1/3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, {
								imageSrc: proj.imageSrc,
								title: proj.title,
								category: proj.category,
								description: proj.description,
								link: proj.link
							})
						}, index))
					})
				}), !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("center", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/projects",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "button-30",
						role: "button_open_projects",
						children: "See More"
					})
				}) })]
			})
		]
	}) });
}
function Blog() {
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchPosts() {
			try {
				setPosts(((await (await fetch("https://gql.hashnode.com", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ query: `query Publication {
          publication(host:"pratyaywrites.hashnode.dev") {
            posts (first:4){
              edges{
                node {
                  coverImage {
                    url
                  },
                  title,
                  brief,
                  url
                }
              }
            }
          }
        }
        ` })
				})).json()).data?.publication?.posts?.edges ?? []).map((e) => e.node));
			} catch (err) {
				console.error("Error fetching blog posts:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchPosts();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SkeletonTheme, {
		baseColor: "#e0e0e0",
		highlightColor: "#f5f5f5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold",
				children: "Blogs"
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					height: 500,
					count: 1
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "body-font",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container px-5 py-24 mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap -m-4 justify-center whitespace-break-spaces",
						children: posts.slice(0, 3).map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 md:w-1/3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogCard, {
								link: post.url,
								imageUrl: post.coverImage?.url ?? "",
								title: post.title,
								brief: post.brief
							})
						}, index))
					})
				}), !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("center", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "button-30",
						role: "button_more_blogs",
						children: "See More"
					})
				}) })]
			})
		]
	}) });
}
function Resume() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold",
		children: "RESUME"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center items-center justify-center top-36 backdrop-blur-30 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "https://drive.google.com/file/d/1Kb_cOhevNgiif-lV3LPJFPjStCKEd0dt/view?usp=drive_link",
			target: "_blank",
			rel: "noopener noreferrer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				role: "button_open_resume",
				className: "relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-large text-gray-900 rounded-lg group bg-linear-to-br from-purple-500 to-pink-500\n                 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white/30 dark:text-white focus:ring-4 focus:outline-none\n                 focus:ring-purple-200 dark:focus:ring-purple-800 transform-gpu transition-all hover:scale-110",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 transform-gpu lg:text-3xl hover:scale-110",
					children: "Show Resume"
				})
			})
		})
	})] });
}
function Donate() {
	const [donation, setDonation] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchDonations() {
			try {
				const { data } = await (await createClient()).from("donation").select("*");
				if (data) setDonation(data);
			} catch (err) {
				console.error("Error fetching donations:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchDonations();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SkeletonTheme, {
		baseColor: "#e0e0e0",
		highlightColor: "#f5f5f5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold",
				children: "Want To Support My Work"
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					count: 1,
					height: 500
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "body-font",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container px-5 py-24 mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap -m-4 justify-center",
						children: donation.map((donation, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 md:w-1/3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonationCard, {
								name: donation.name,
								image: donation.image,
								link: donation.link
							})
						}, index))
					})
				})
			})
		]
	}) });
}
function Contact() {
	const [socialLinks, setSocialLinks] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchSocialLinks() {
			try {
				const { data } = await (await createClient()).from("social_link").select("*");
				if (data) setSocialLinks(data);
			} catch (err) {
				console.error("Error fetching social links:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchSocialLinks();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SkeletonTheme, {
		baseColor: "#e0e0e0",
		highlightColor: "#f5f5f5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold",
				children: "CONTACT ME"
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-10 mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					count: 1,
					height: 40
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2 relative flex-auto flex-wrap overflow-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {
					direction: "middle",
					magnification: 60,
					distance: 100,
					children: socialLinks.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
						className: "bg-black/10 dark:bg-white/10 p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCard, {
							image: item.image,
							link: item.link,
							name: item.name
						})
					}, index))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex fles-wrap text-center items-center justify-center p-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/message_me",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "border border-indigo-600 hover:bg-indigo-600 dark:bg-white text-3xl dark:text-black font-bold py-2 px-4 rounded-full",
						children: "Message Me"
					})
				})
			})
		]
	}) });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "photo",
			className: "snap-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "aboutme",
			className: "snap-center justify-center pt-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutMe, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "education",
			className: "snap-center justify-center pt-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Education, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "skills",
			className: "snap-center justify-center pt-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "certificate",
			className: "snap-center justify-center pt-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Certificates, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "projects",
			className: "snap-center justify-center pt-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "blogs",
			className: "snap-center justify-center pt-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blog, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "resume",
			className: "snap-center justify-center pt-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resume, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "donate",
			className: "snap-center justify-center pt-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Donate, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "contact",
			className: "snap-center justify-center pt-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
		})
	] }) });
}
//#endregion
export { Home as component };
