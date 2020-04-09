import Button from "./form-components/Button";
import Heading from "./Heading";
const LRSection = ({
	heading,
	subHeading,
	content,
	children,
	link,
	linkText,
	image,
	alt,
	onLinkClick,
}) => (
	<div className="c-lr-section">
		<div className="c-lr-section__head-wrapper">
			<div className="row c-lr-section__row align-items-center">
				<div className="flex-grow-0 c-lr-section__heading-wrapper">
					<Heading parentClass="c-lr-section">{heading}</Heading>
				</div>
				<div className="col-md-4 c-lr-section__sub-heading-wrapper">
					<h4 className="c-lr-section__sub-heading">{subHeading}</h4>
				</div>
			</div>
		</div>
		<div className="c-lr-section__main">
			<div className="row c-lr-section__row">
				<div className="c-lr-section__col d-flex flex-column justify-content-around c-lr-section__col--text c-lr-section__col--sm-5 col-sm-5">
					<div className="c-lr-section__content-wrap">
						{content}
						{children}
					</div>
					<div className="c-lr-section__btn-wrapper">
						{linkText && (
							<Button
								theme="btm-br"
								type="link"
								onClick={() => {
									if (typeof onLinkClick === "function") {
										onLinkClick();
									}
								}}
								link={link}
							>
								{linkText}
							</Button>
						)}
					</div>
				</div>
				<div className="c-lr-section__col c-lr-section__col--image c-lr-section__col--sm-7 col-sm-7">
					<img
						className="img-fluid c-lr-section__img"
						src={image}
						alt={alt ? alt : heading}
					/>
				</div>
			</div>
		</div>
	</div>
);

export default LRSection;
