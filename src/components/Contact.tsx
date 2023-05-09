import Link from 'next/link';
import { ReactNode } from 'react';

function ContactItem({ children }:{ children: ReactNode }) {
  return (
    <li className="flex gap-2">
      {children}
    </li>
  );
}

function MailIcon() {
  return (
    <svg
      height="20px"
      width="20px"
      className="fill-slate-400"
      viewBox="0 0 348.165 348.165"
    >
      <g>
        <g>
          <polygon points="0,60.58 0,71.921 174.083,193.19 348.165,71.921 348.165,60.58" />
          <polygon points="174.083,217.356 71.545,145.228 0,95.39 0,287.585 348.165,287.585 348.165,95.39
          276.62,145.228"
          />
        </g>
      </g>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20px" height="20px" viewBox="0 0 24 24" className="fill-slate-400">
      <path d="M2.00589 4.54166C1.905 3.11236 3.11531 2 4.54522 2H7.60606C8.34006 2 9.00207 2.44226 9.28438 3.1212L10.5643 6.19946C10.8761 6.94932 10.6548 7.81544 10.0218 8.32292L9.22394 8.96254C8.86788 9.24798 8.74683 9.74018 8.95794 10.1448C10.0429 12.2241 11.6464 13.9888 13.5964 15.2667C14.008 15.5364 14.5517 15.4291 14.8588 15.0445L15.6902 14.003C16.1966 13.3687 17.0609 13.147 17.8092 13.4594L20.8811 14.742C21.5587 15.0249 22 15.6883 22 16.4238V19.5C22 20.9329 20.8489 22.0955 19.4226 21.9941C10.3021 21.3452 2.65247 13.7017 2.00589 4.54166Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="20px" height="20px" viewBox="0 0 384 512" className="fill-slate-400">
      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
    </svg>
  );
}

export interface ContactData {
  mail:string
  phone: string
  location?: string
  locationLink?: string
}

interface Props {
  data: ContactData
}

function Contact({ data }:Props) {
  return (
    <ul className="flex justify-between text-sm text-gray-400">
      <ContactItem>
        <MailIcon />
        <span>
          <Link className="flex gap-2" href={`mailto:${data.mail}`}>
            {data.mail}
          </Link>
        </span>
      </ContactItem>
      <ContactItem>
        <PhoneIcon />
        <span>
          <Link className="flex gap-2" href={`tel:${data.phone}`}>
            {data.phone}
          </Link>

        </span>
      </ContactItem>
      <ContactItem>
        <LocationIcon />
        <span>
          <Link className="flex gap-2" href={data.locationLink || ''}>
            {data.location}
          </Link>
        </span>
      </ContactItem>
    </ul>
  );
}

export default Contact;
