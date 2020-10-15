-- SEQUENCE: public.smapp_user__id_seq

-- DROP SEQUENCE public.smapp_user__id_seq;

CREATE SEQUENCE public.smapp_user__id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.smapp_user__id_seq
    OWNER TO smapp;

-- Table: public.smapp_user

-- DROP TABLE public.smapp_user;

CREATE TABLE public.smapp_user
(
    _id integer NOT NULL DEFAULT nextval('smapp_user__id_seq'::regclass),
    user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    last_logged_in timestamp without time zone,
    CONSTRAINT smapp_user_pkey PRIMARY KEY (_id)
)

TABLESPACE pg_default;

ALTER TABLE public.smapp_user
    OWNER to smapp;