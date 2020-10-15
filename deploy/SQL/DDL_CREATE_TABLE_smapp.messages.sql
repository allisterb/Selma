-- SEQUENCE: public.messages__id_seq

-- DROP SEQUENCE public.messages__id_seq;

CREATE SEQUENCE public.messages__id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.messages__id_seq
    OWNER TO smapp;

-- Table: public.messages

-- DROP TABLE public.messages;

CREATE TABLE public.messages
(
    _id integer NOT NULL DEFAULT nextval('messages__id_seq'::regclass),
    user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    date timestamp without time zone NOT NULL,
    text character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    is_read boolean NOT NULL DEFAULT FALSE,
    CONSTRAINT messages_pkey PRIMARY KEY (_id)
)

TABLESPACE pg_default;

ALTER TABLE public.messages
    OWNER to smapp;