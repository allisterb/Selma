-- SEQUENCE: public.physical_symptom_journal__id_seq

-- DROP SEQUENCE public.physical_symptom_journal__id_seq;

CREATE SEQUENCE public.physical_symptom_journal__id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.physical_symptom_journal__id_seq
    OWNER TO smapp;

-- Table: public.physical_symptom_journal

-- DROP TABLE public.physical_symptom_journal;

CREATE TABLE public.physical_symptom_journal
(
    _id integer NOT NULL DEFAULT nextval('physical_symptom_journal__id_seq'::regclass),
    user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    date timestamp without time zone NOT NULL,
    magnitude integer,
    location character varying(100) COLLATE pg_catalog."default",
    name character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT physical_symptom_journal_pkey PRIMARY KEY (_id)
)

TABLESPACE pg_default;

ALTER TABLE public.physical_symptom_journal
    OWNER to smapp;

GRANT ALL ON TABLE public.physical_symptom_journal TO smapp;