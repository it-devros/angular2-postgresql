--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: dispatch_lines; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE dispatch_lines (
    id_dispatch bigint NOT NULL,
    id_line bigint NOT NULL,
    id_material bigint NOT NULL,
    quantity numeric(10,0) NOT NULL
);


ALTER TABLE public.dispatch_lines OWNER TO postgres;

--
-- Name: dispatches; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE dispatches (
    id_dispatch bigint NOT NULL,
    id_purchase_order bigint NOT NULL,
    dispatch_date date NOT NULL,
    reference text NOT NULL
);


ALTER TABLE public.dispatches OWNER TO postgres;

--
-- Name: dispatches_id_dispatch_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE dispatches_id_dispatch_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dispatches_id_dispatch_seq OWNER TO postgres;

--
-- Name: dispatches_id_dispatch_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE dispatches_id_dispatch_seq OWNED BY dispatches.id_dispatch;


--
-- Name: materials_master; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE materials_master (
    id_material bigint NOT NULL,
    description character varying(80) NOT NULL,
    reserved boolean,
    datechanged date NOT NULL,
    price numeric(10,2) NOT NULL,
    id_materialtype bigint NOT NULL
);


ALTER TABLE public.materials_master OWNER TO postgres;

--
-- Name: materials_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE materials_type (
    id_materialtype bigint NOT NULL,
    description character varying(80) NOT NULL
);


ALTER TABLE public.materials_type OWNER TO postgres;

--
-- Name: materials_type_id_materialtype_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE materials_type_id_materialtype_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.materials_type_id_materialtype_seq OWNER TO postgres;

--
-- Name: materials_type_id_materialtype_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE materials_type_id_materialtype_seq OWNED BY materials_type.id_materialtype;


--
-- Name: po_lines; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE po_lines (
    id_purchase_order bigint NOT NULL,
    id_line bigint NOT NULL,
    id_material bigint NOT NULL,
    quantity numeric(10,0) NOT NULL,
    price_unit numeric(10,2) NOT NULL,
    client character varying(80) DEFAULT 'qwe'::character varying NOT NULL
);


ALTER TABLE public.po_lines OWNER TO postgres;

--
-- Name: purchase_orders; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE purchase_orders (
    id_purchase_orders bigint NOT NULL,
    id_supplier bigint NOT NULL,
    date date NOT NULL,
    completed boolean,
    total bigint DEFAULT 3430040 NOT NULL
);


ALTER TABLE public.purchase_orders OWNER TO postgres;

--
-- Name: purchase_orders_id_purchase_orders_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE purchase_orders_id_purchase_orders_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.purchase_orders_id_purchase_orders_seq OWNER TO postgres;

--
-- Name: purchase_orders_id_purchase_orders_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE purchase_orders_id_purchase_orders_seq OWNED BY purchase_orders.id_purchase_orders;


--
-- Name: stock; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE stock (
    id_stock bigint NOT NULL,
    id_material bigint NOT NULL,
    quantity numeric(10,2),
    minimum numeric(10,2) NOT NULL,
    reserved numeric(10,2) NOT NULL
);


ALTER TABLE public.stock OWNER TO postgres;

--
-- Name: stock_id_stock_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE stock_id_stock_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stock_id_stock_seq OWNER TO postgres;

--
-- Name: stock_id_stock_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE stock_id_stock_seq OWNED BY stock.id_stock;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE suppliers (
    id_suppliers bigint NOT NULL,
    full_name character varying(50) NOT NULL,
    address character varying(80) NOT NULL,
    contact text NOT NULL,
    cuit numeric(11,0) NOT NULL,
    active boolean
);


ALTER TABLE public.suppliers OWNER TO postgres;

--
-- Name: suppliers_id_suppliers_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE suppliers_id_suppliers_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.suppliers_id_suppliers_seq OWNER TO postgres;

--
-- Name: suppliers_id_suppliers_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE suppliers_id_suppliers_seq OWNED BY suppliers.id_suppliers;


--
-- Name: suppliers_materials; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE suppliers_materials (
    id_supplier bigint NOT NULL,
    id_material bigint NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.suppliers_materials OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    id_user bigint NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(80) NOT NULL,
    password text NOT NULL,
    address text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_user_seq OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_id_user_seq OWNED BY users.id_user;


--
-- Name: id_dispatch; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dispatches ALTER COLUMN id_dispatch SET DEFAULT nextval('dispatches_id_dispatch_seq'::regclass);


--
-- Name: id_materialtype; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY materials_type ALTER COLUMN id_materialtype SET DEFAULT nextval('materials_type_id_materialtype_seq'::regclass);


--
-- Name: id_purchase_orders; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY purchase_orders ALTER COLUMN id_purchase_orders SET DEFAULT nextval('purchase_orders_id_purchase_orders_seq'::regclass);


--
-- Name: id_stock; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY stock ALTER COLUMN id_stock SET DEFAULT nextval('stock_id_stock_seq'::regclass);


--
-- Name: id_suppliers; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY suppliers ALTER COLUMN id_suppliers SET DEFAULT nextval('suppliers_id_suppliers_seq'::regclass);


--
-- Name: id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id_user SET DEFAULT nextval('users_id_user_seq'::regclass);


--
-- Data for Name: dispatch_lines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY dispatch_lines (id_dispatch, id_line, id_material, quantity) FROM stdin;
4	379783985934	3985934	11
4	3763611111	11111	22
5	413363534095	3534095	12
\.


--
-- Data for Name: dispatches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY dispatches (id_dispatch, id_purchase_order, dispatch_date, reference) FROM stdin;
4	37	2017-03-15	this is ok.
5	41	2017-03-17	this is ok.
\.


--
-- Name: dispatches_id_dispatch_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('dispatches_id_dispatch_seq', 5, true);


--
-- Data for Name: materials_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY materials_master (id_material, description, reserved, datechanged, price, id_materialtype) FROM stdin;
3534095	xxx material	t	2017-03-10	5000.00	2
3985934	yyy material	f	2017-03-10	29302.00	1
11111	zzz material	f	2017-03-10	50302.00	1
\.


--
-- Data for Name: materials_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY materials_type (id_materialtype, description) FROM stdin;
1	xxxxtype
2	yyyytype
\.


--
-- Name: materials_type_id_materialtype_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('materials_type_id_materialtype_seq', 2, true);


--
-- Data for Name: po_lines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY po_lines (id_purchase_order, id_line, id_material, quantity, price_unit, client) FROM stdin;
40	409713985934	3985934	23	29302.00	qwe
40	4039011111	11111	35	50302.00	qwe
41	413363534095	3534095	12	5000.00	qwe
\.


--
-- Data for Name: purchase_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY purchase_orders (id_purchase_orders, id_supplier, date, completed, total) FROM stdin;
40	2	2017-02-12	f	2434516
41	1	2017-02-12	f	60000
\.


--
-- Name: purchase_orders_id_purchase_orders_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('purchase_orders_id_purchase_orders_seq', 41, true);


--
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY stock (id_stock, id_material, quantity, minimum, reserved) FROM stdin;
1	3534095	3800.00	2000.00	5000.00
2	3985934	4930.00	4000.00	9000.00
\.


--
-- Name: stock_id_stock_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('stock_id_stock_seq', 2, true);


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY suppliers (id_suppliers, full_name, address, contact, cuit, active) FROM stdin;
1	kevin	290 street	239482	4579	t
2	slova	300 street	239823	21099	t
\.


--
-- Name: suppliers_id_suppliers_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('suppliers_id_suppliers_seq', 2, true);


--
-- Data for Name: suppliers_materials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY suppliers_materials (id_supplier, id_material, price) FROM stdin;
1	3534095	5000.00
2	3985934	3000.00
2	11111	2300.00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id_user, first_name, last_name, email, password, address) FROM stdin;
4	admin	admin	admin@mail.com	058ad9992f	admin
5	qwe	qwe	qwe	1599d1	qwe
6	admin	admin	admin	058ad9992f	admin
7	wer	wer	wer	138bc6	wer
8	ert	ert	ert	019cc0	ert
9	rty	rty	rty	169acd	rty
10	uio	uio	uio	1187db	uio
11	James	Taylor	jamestaylor@mail.com	0e8fd99532	309 street
\.


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_user_seq', 11, true);


--
-- Name: dispatch_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY dispatch_lines
    ADD CONSTRAINT dispatch_lines_pkey PRIMARY KEY (id_dispatch, id_line);


--
-- Name: dispatches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY dispatches
    ADD CONSTRAINT dispatches_pkey PRIMARY KEY (id_dispatch);


--
-- Name: materials_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY materials_master
    ADD CONSTRAINT materials_master_pkey PRIMARY KEY (id_material);


--
-- Name: materials_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY materials_type
    ADD CONSTRAINT materials_type_pkey PRIMARY KEY (id_materialtype);


--
-- Name: po_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY po_lines
    ADD CONSTRAINT po_lines_pkey PRIMARY KEY (id_purchase_order, id_line);


--
-- Name: purchase_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY purchase_orders
    ADD CONSTRAINT purchase_orders_pkey PRIMARY KEY (id_purchase_orders);


--
-- Name: stock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id_stock);


--
-- Name: suppliers_materials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY suppliers_materials
    ADD CONSTRAINT suppliers_materials_pkey PRIMARY KEY (id_supplier, id_material);


--
-- Name: suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id_suppliers);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

