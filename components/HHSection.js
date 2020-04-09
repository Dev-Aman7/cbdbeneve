import Heading from "./Heading";
import Button from "./form-components/Button";
import classNames from "classnames";
const HHSection = ({
	heading,
	subHeading,
	linkText,
	link,
	images,
	bg,
	children,
}) => {
	const className = classNames("c-hh-section", {
		[`c-hh-section--${bg}`]: bg,
	});
	return (
		<div className={className}>
			<div className="row c-hh-section__row">
				<div className="col-12 c-hh-section__heading-wrapper">
					<Heading parentClass="c-hh-section">{heading}</Heading>
				</div>
				<div className="col-lg-7 c-hh-section__sub-heading-wrapper">
					<Heading
						h="4"
						subHeading={true}
						parentClass="c-hh-section"
						versions={["default", "lft-br"]}
					>
						{subHeading}
					</Heading>
				</div>
				<div className="col-lg-5 c-hh-section__btn-wrapper mt-4">
					{linkText && (
						<Button
							theme="outline-brand"
							type="link"
							className="mt-3"
							link={link || "#"}
						>
							{linkText}
						</Button>
					)}
				</div>
				{images.map((el, i) => (
					<div key={i} className="col-md-6 c-hh-section__img-wrapper">
						<img
							src={el}
							className="c-hh-section__img img-fluid"
							alt={heading}
						/>
					</div>
				))}
				<div className="col-12">{children}</div>
			</div>
		</div>
	);
};

HHSection.defaultProps = {
	images: [],
};

export default HHSection;
