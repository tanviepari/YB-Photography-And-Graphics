--
-- PostgreSQL database dump
--

\restrict SeflG4nfcE371uNqyemuGkOXcQSi25XX24a8rJbpg199yfhqavWdxJ7FtVPRSGk

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-03-18 21:30:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "YB-Photography-and-Graphics";
--
-- TOC entry 5047 (class 1262 OID 30434)
-- Name: YB-Photography-and-Graphics; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "YB-Photography-and-Graphics" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "YB-Photography-and-Graphics" OWNER TO postgres;

\unrestrict SeflG4nfcE371uNqyemuGkOXcQSi25XX24a8rJbpg199yfhqavWdxJ7FtVPRSGk
\encoding SQL_ASCII
\connect -reuse-previous=on "dbname='YB-Photography-and-Graphics'"
\restrict SeflG4nfcE371uNqyemuGkOXcQSi25XX24a8rJbpg199yfhqavWdxJ7FtVPRSGk

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 30449)
-- Name: booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking (
    booking_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(15),
    event_type character varying(50),
    event_date date,
    location character varying(150),
    message text,
    booking_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.booking OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 30448)
-- Name: booking_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.booking_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.booking_booking_id_seq OWNER TO postgres;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 221
-- Name: booking_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.booking_booking_id_seq OWNED BY public.booking.booking_id;


--
-- TOC entry 220 (class 1259 OID 30436)
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    contact_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(15),
    message text,
    submitted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 30435)
-- Name: contact_contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_contact_id_seq OWNER TO postgres;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 219
-- Name: contact_contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_contact_id_seq OWNED BY public.contact.contact_id;


--
-- TOC entry 226 (class 1259 OID 30475)
-- Name: gallery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gallery (
    photo_id integer NOT NULL,
    category character varying(50),
    image_url text,
    description text
);


ALTER TABLE public.gallery OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 30474)
-- Name: gallery_photo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gallery_photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gallery_photo_id_seq OWNER TO postgres;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 225
-- Name: gallery_photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gallery_photo_id_seq OWNED BY public.gallery.photo_id;


--
-- TOC entry 224 (class 1259 OID 30462)
-- Name: testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonials (
    testimonial_id integer NOT NULL,
    client_name character varying(100) NOT NULL,
    email character varying(100),
    rating integer,
    feedback text,
    submitted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT testimonials_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.testimonials OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 30461)
-- Name: testimonials_testimonial_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.testimonials_testimonial_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonials_testimonial_id_seq OWNER TO postgres;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 223
-- Name: testimonials_testimonial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.testimonials_testimonial_id_seq OWNED BY public.testimonials.testimonial_id;


--
-- TOC entry 4873 (class 2604 OID 30452)
-- Name: booking booking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking ALTER COLUMN booking_id SET DEFAULT nextval('public.booking_booking_id_seq'::regclass);


--
-- TOC entry 4871 (class 2604 OID 30439)
-- Name: contact contact_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact ALTER COLUMN contact_id SET DEFAULT nextval('public.contact_contact_id_seq'::regclass);


--
-- TOC entry 4877 (class 2604 OID 30478)
-- Name: gallery photo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery ALTER COLUMN photo_id SET DEFAULT nextval('public.gallery_photo_id_seq'::regclass);


--
-- TOC entry 4875 (class 2604 OID 30465)
-- Name: testimonials testimonial_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN testimonial_id SET DEFAULT nextval('public.testimonials_testimonial_id_seq'::regclass);


--
-- TOC entry 5037 (class 0 OID 30449)
-- Dependencies: 222
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking (booking_id, name, email, phone, event_type, event_date, location, message, booking_time) FROM stdin;
\.


--
-- TOC entry 5035 (class 0 OID 30436)
-- Dependencies: 220
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact (contact_id, name, email, phone, message, submitted_at) FROM stdin;
\.


--
-- TOC entry 5041 (class 0 OID 30475)
-- Dependencies: 226
-- Data for Name: gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gallery (photo_id, category, image_url, description) FROM stdin;
\.


--
-- TOC entry 5039 (class 0 OID 30462)
-- Dependencies: 224
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testimonials (testimonial_id, client_name, email, rating, feedback, submitted_at) FROM stdin;
\.


--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 221
-- Name: booking_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.booking_booking_id_seq', 1, false);


--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 219
-- Name: contact_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_contact_id_seq', 1, false);


--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 225
-- Name: gallery_photo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gallery_photo_id_seq', 1, false);


--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 223
-- Name: testimonials_testimonial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.testimonials_testimonial_id_seq', 1, false);


--
-- TOC entry 4882 (class 2606 OID 30460)
-- Name: booking booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (booking_id);


--
-- TOC entry 4880 (class 2606 OID 30447)
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (contact_id);


--
-- TOC entry 4886 (class 2606 OID 30483)
-- Name: gallery gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gallery
    ADD CONSTRAINT gallery_pkey PRIMARY KEY (photo_id);


--
-- TOC entry 4884 (class 2606 OID 30473)
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (testimonial_id);


-- Completed on 2026-03-18 21:30:05

--
-- PostgreSQL database dump complete
--

\unrestrict SeflG4nfcE371uNqyemuGkOXcQSi25XX24a8rJbpg199yfhqavWdxJ7FtVPRSGk

