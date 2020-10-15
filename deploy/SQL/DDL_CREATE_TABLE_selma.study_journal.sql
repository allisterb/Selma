-- SEQUENCE: public.study_journal__id_seq

-- DROP SEQUENCE public.study_journal__id_seq;

CREATE SEQUENCE public.study_journal__id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.study_journal__id_seq
    OWNER TO selma;

-- Table: public.study_journal

-- DROP TABLE public.study_journal;

CREATE TABLE public.study_journal
(
    _id integer NOT NULL DEFAULT nextval('study_journal__id_seq'::regclass),
    user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    date timestamp without time zone,
    subject character varying(200) COLLATE pg_catalog."default",
    duration integer,
    CONSTRAINT study_journal_pkey PRIMARY KEY (_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.study_journal
    OWNER to selma;