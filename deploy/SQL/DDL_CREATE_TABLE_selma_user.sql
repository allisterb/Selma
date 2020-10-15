-- SEQUENCE: public.selma_user__id_seq

-- DROP SEQUENCE public.selma_user__id_seq;

CREATE SEQUENCE public.selma_user__id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.selma_user__id_seq
    OWNER TO selma;

-- Table: public.selma_user

-- DROP TABLE public.selma_user;

CREATE TABLE public.selma_user
(
    _id integer NOT NULL DEFAULT nextval('selma_user__id_seq'::regclass),
    user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    last_logged_in timestamp without time zone,
    CONSTRAINT selma_user_pkey PRIMARY KEY (_id)
)

TABLESPACE pg_default;

ALTER TABLE public.selma_user
    OWNER to selma;